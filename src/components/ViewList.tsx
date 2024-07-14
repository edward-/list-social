'use client';

import { ViewProps } from '@/lib/interfaces';

export default function ViewList({ intl, todoList, closeDetails }: ViewProps) {
  return (
    <div className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full h-full'>
      <div className='relative p-4 w-full max-w-2xl max-h-full'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              {intl ? intl.formatMessage({ id: 'modal-view-list.title' }) : '[ToDo List]'}
            </h3>
            <button
              type='button'
              onClick={closeDetails}
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path className='stroke-2 stroke-current ' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
              </svg>
              <span className='sr-only'>Close</span>
            </button>
          </div>
          <div className='p-4 md:p-5 space-y-4'>
            <form className='max-w-sm mx-auto'>
              <div className='mb-5'>
                <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  {intl ? intl.formatMessage({ id: 'modal-create-list.list-name' }) : '[List name]'}
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  autoComplete='off'
                  readOnly
                  value={todoList.name}
                  className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                  placeholder='new list'
                  required
                />
              </div>

              <div className='relative max-w-sm'>
                <label htmlFor='deadLine' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  {intl ? intl.formatMessage({ id: 'modal-create-list.deadline' }) : '[List name]'}
                </label>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
                  </svg>
                </div>
                <div className='flex items-start mb-5'>
                  <input
                    readOnly
                    id='deadLine'
                    type='datetime-local'
                    name='deadLine'
                    value={todoList.deadLine}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                </div>
              </div>
              {todoList.items.map((item) => (
                <div key={item.order} className='relative max-w-sm p-1'>
                  <input
                    readOnly
                    type='text'
                    id={'item-' + item.order}
                    name={String(item.order)}
                    value={item.name}
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                    placeholder='item'
                    required
                  />
                </div>
              ))}
            </form>
          </div>
          <div className='flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600'>
            <button
              type='button'
              onClick={closeDetails}
              className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            >
              {intl ? intl.formatMessage({ id: 'modal-view-todo-list.close' }) : '[Close]'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
