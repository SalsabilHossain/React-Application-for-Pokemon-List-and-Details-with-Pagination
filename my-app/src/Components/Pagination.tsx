import "./Pagination.css";

export const Pagination = ({ postsPerPage, totalPosts, paginate }: PaginationProps): JSX.Element => {
  const pageNumbers = [];
 
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <span onClick={() => paginate(number)} >
                {number}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

type PaginationProps = {
    postsPerPage: number;
    totalPosts: number;
    paginate: any;
}