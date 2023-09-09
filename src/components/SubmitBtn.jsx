import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  //  console.log(navigation);
  const isSubmit = navigation.state === "submitting";

  return (
    <button
      type="summit"
      className="btn btn-secondary btn-block"
      disabled={isSubmit}
    >
      {isSubmit ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        // 後面的 "submit" just in case , 當 props 忘記傳入時可以使用
        text || "submit"
      )}
    </button>
  );
};

export default SubmitBtn;
