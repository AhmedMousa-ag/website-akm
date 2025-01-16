import { PargraphContent } from "./ParagraphContent";
export const HomePageContent = () => {
  return (
    <div>
      <PargraphContent extraCss={"mt-56"}>
        <p>
          Polymaths, I find myself captivated by a vast array of fields, ranging
          from agriculture and biology to software development and beyond.
        </p>
      </PargraphContent>
      <PargraphContent>
        <a href="https://www.linkedin.com/in/akmousa/">
          Looking forward to solve the next challenge, and can volunteer for
          none profit organizations.
          <br />
          If you need help, feel free to contact me
        </a>
      </PargraphContent>
      <PargraphContent>
        <p>Certified by google in Tensorflow Machine Learning,</p>
        <p>
          Pursuing a Master's in both Agriculture sciences and Computer Science
          to complement my Bachelor's in Agricultural Science.
        </p>
      </PargraphContent>
    </div>
  );
};
