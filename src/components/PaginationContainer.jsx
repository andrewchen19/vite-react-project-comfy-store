import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  // console.log(meta);
  const { page, pageCount } = meta.pagination;

  const location = useLocation();
  // console.log(location);
  const { pathname, search } = location;

  const navigate = useNavigate();

  // event handling (click button)
  const pageChangeHandler = (number) => {
    // URLSearchParams 是 JS 內建
    // 可以添加、刪除、訪問 URL 的 query string
    const searchParams = new URLSearchParams(search);
    // set() -> 如果有重複的 key 會覆蓋並更新它；沒有重複則新增在最後
    searchParams.set("page", number);
    // 導航
    // toSting() returns the query string suitable for use in a URL but "without" the question mark
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  // return array of xxx
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });
  // console.log(pages);

  // conditional rendering
  // 當總頁面數量小於 2 時，不會出現 pagination container
  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-center">
      <div className="join">
        {/* prev button */}
        <button
          className="btn btn-secondary btn-sm sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            pageChangeHandler(prevPage);
          }}
        >
          prev
        </button>

        {/* page buttons，動態生成數量 */}
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`btn btn-secondary btn-sm sm:btn-md join-item ${
                pageNumber === page && "btn-active"
              }`}
              onClick={() => pageChangeHandler(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* next button */}
        <button
          className="btn btn-secondary btn-sm sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            pageChangeHandler(nextPage);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
