import "./section-title.scss";

const SectionTitle = ({ title, subTitle }) => {
  return (
    <div id="section_title">
      <h3> {title} </h3>
      <p> {subTitle} </p>
    </div>
  );
};

export default SectionTitle;
