import { get } from 'https';
import { createWriteStream, unlink } from 'fs';
import { join, path } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const images = [
  {
    url: 'https://www.dokwiki.ibik.ru/en/v3/core/_media/quickstart/aster_install.png',
    filename: 'aster-installation.png'
  },
  {
    url: 'https://www.dokwiki.ibik.ru/en/v3/core/_media/quickstart/aster_activation.png',
    filename: 'aster-activation.png'
  },
  {
    url: 'https://www.dokwiki.ibik.ru/en/v3/core/_media/quickstart/monitor_setup.png',
    filename: 'monitor-setup.png'
  },
  {
    url: 'https://www.dokwiki.ibik.ru/en/v3/core/_media/quickstart/enable_aster.png',
    filename: 'enable-aster.png'
  },
  {
    url: 'https://www.dokwiki.ibik.ru/en/v3/core/_media/quickstart/troubleshooting.png',
    filename: 'troubleshooting.png'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = join(__dirname, '../src/assets/images/wiki', filename);
    const file = createWriteStream(filepath);

    get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      unlink(filepath, () => {});
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  try {
    for (const image of images) {
      await downloadImage(image.url, image.filename);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadAllImages(); 