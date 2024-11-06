export const LoadingBouncer = ({
  extra_classes,
}: {
  extra_classes?: string;
}) => {
  let cssClass = "line-through animate-bounce animate-bounce-slow ";
  if (extra_classes) {
    cssClass = cssClass + extra_classes;
  }
  return (
    <div className={cssClass}>
      <p>Loading....</p>
    </div>
  );
};
