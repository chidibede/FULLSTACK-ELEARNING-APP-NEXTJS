const Env = ({ port }) => {
  return <div>{port}</div>;
};

// Env.getInitialProps = async () => {
//   const port = process.env.NEXT_PUBLIC_PORT;

//   console.log(process.env.PORT);

//   return { port: port };
// };

export const getStaticProps = () => {
  console.log(process.env.SECRET);
  const secret = process.env.SECRET;
  return { props: { secret } };
};
export default Env;
