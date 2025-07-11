
import JoditEditor from 'jodit-react';
import { useEffect, useMemo, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore';

const AddWikiModal = ({ currentWiki }) => {
  const editor = useRef(null);
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: { currentWiki }
  });
  const { token, fetchCategories, categories } = useAdminStore();

  const navigate = useNavigate()

  // Editor config
  const config = useMemo(() => ({
    readonly: false,
    height: 600,
    uploader: {
      url: 'http://localhost:4000/api/admin/wiki/upload',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      defaultHandlerSuccess: (response) => {
        return response.file ? response.file.url : null;
      },
      process: (response) => {
        return {
          files: [response.file],
          error: response.error ? [response.error] : []
        };
      }
    },
    toolbarAdaptive: false,
    buttons: [
      'source', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'indent', 'outdent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'file', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'fullsize'
    ],
    events: {
      beforeImage: (image) => {
        // Add classes for responsive images
        image.style.maxWidth = '100%';
        image.style.height = 'auto';
        return image;
      }
    },
    style: {
      color: "#000"
    }
  }), []);
  const onSubmit = async (data) => {
    
    try {
      const method = currentWiki ? 'PUT' : 'POST';
      const url = currentWiki
        ? `http://localhost:4000/api/admin/wikis/${currentWiki.id}`
        : 'http://localhost:4000/api/admin/wikis';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.status === 200) {
            document.getElementById('addWikiModal').close()

        navigate('/admin/wikis', {replace: true});
        reset()
      }
    } catch (error) {
      console.error('Error saving wiki:', error);
    }
  };

  useEffect(() => {
    console.log(currentWiki)
    fetchCategories()
    if (currentWiki) {
      reset({
        title: currentWiki.title,
        content: currentWiki.content,
        categoryId: currentWiki.categoryId
      });
    }
  }, [currentWiki, reset]);

  return (
    <dialog className="modal" id="addWikiModal">
      <div className="modal-box w-11/12 max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <select {...register('categoryId', { required: 'Category is required' })} className="select w-full px-3 py-2 border rounded">
              {categories.map((category)=> {
                return <option key={category.id} value={category.id}>{category.name}</option>
              })}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter wiki title"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Content</label>
            <Controller
              name="content"
              control={control}
              rules={{ required: 'Content is required' }}
              render={({ field: { onChange, value } }) => (
                <JoditEditor
                  ref={editor}
                  value={value}
                  config={config}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" >
              {currentWiki ? 'Update' : 'Create'} Wiki
            </button>
          </div>
        </form>
        <form method="dialog">
          {/* if there is a button, it will close the modal */}
          <button className="btn">Cancel</button>
        </form>
      </div>
    </dialog>
  );
};

export default AddWikiModal;