const ButtonGet = React.createElement(
  'button',
  {
    onClick(event) {
      event.preventDefault();

      fetch('/api?get=1')
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
    key: 'getButton',
  },
  'Get'
);

const ButtonPost = React.createElement(
  'button',
  {
    onClick(event) {
      event.preventDefault();

      fetch('/api', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: '1' }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    },
    key: 'postButton',
  },
  'Post'
);

export default React.createElement(
  'div',
  { className: 'shopping-list' },
  ButtonGet,
  ButtonPost
);
