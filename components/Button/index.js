import style from "./style.module.css";

const Button = ({ text, className }) => {
	return (
		<button
			type="submit"
			className={`nav-link ${className} fw-bold px-2 ${style.borderConnexion}`}
		>
			{text}
		</button>
	);
};

export default Button;
