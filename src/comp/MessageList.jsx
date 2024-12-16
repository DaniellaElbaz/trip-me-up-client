import PropTypes from 'prop-types';
export default function MessageList({ messages }) {
    return (
      <div className="flex flex-col flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[75%] p-3 rounded-lg mb-3 ${
              message.type === 'incoming'
                ? 'self-start bg-gray-300 text-gray-800'
                : 'self-end bg-blue-200 text-gray-800'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
    );
  }


MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};
