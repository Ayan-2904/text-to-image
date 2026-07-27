import {
  FaClock,
  FaTrash,
  FaImage,
} from "react-icons/fa";

function HistoryCard({ history = [] }) {
  return (
    <div className="history-card">

      <div className="history-header">

        <h2>
          <FaClock />
          Recent History
        </h2>

        <button>
          View All
        </button>

      </div>

      {history.length === 0 ? (

        <div className="empty-history">

          <FaImage />

          <h3>No Images Yet</h3>

          <p>
            Your generated images will appear here.
          </p>

        </div>

      ) : (

        history.map((item) => (

          <div
            key={item._id}
            className="history-item"
          >

            <img
              src={item.image}
              alt="history"
            />

            <div className="history-info">

              <h4>{item.prompt}</h4>

              <p>
                {new Date(item.createdAt)
                  .toLocaleString()}
              </p>

            </div>

            <button className="delete-btn">

              <FaTrash />

            </button>

          </div>

        ))

      )}

    </div>
  );
}

export default HistoryCard;