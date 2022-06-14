import ContentLoader from 'react-content-loader';

const PizzaSceleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="277" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="323" rx="10" ry="10" width="280" height="83" />
    <rect x="0" y="424" rx="10" ry="10" width="90" height="27" />
    <rect x="146" y="419" rx="30" ry="30" width="129" height="41" />
  </ContentLoader>
);

export default PizzaSceleton;
