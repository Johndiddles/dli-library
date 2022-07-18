import loader from "../../assets/loader.svg";
import "./Loader.styles.scss";

const LoadingState = () => {
  return (
    <div className="loaderWrapper">
      <img src={loader} alt="loading modules" />
      <p>Fetching your modules...</p>
    </div>
  );
};

export default LoadingState;
