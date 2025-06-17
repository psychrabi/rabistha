const MatrixCard = ({data}) => {
  const {title, value, color, Icon} = data
  return (
    <div className="rounded-lg  bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Icon className={`${color} h-6 w-6`} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default MatrixCard;