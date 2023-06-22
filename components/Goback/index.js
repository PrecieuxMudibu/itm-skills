import { useRouter } from "next/router";
import Image from "next/image";
import goback from "../../assets/goback.svg";
import Link from "next/link"
import style from "./style.module.css"
const GoBack = () => {
  const router = useRouter();

  return (
  <div className={style.cursorPointer}>
      <Link href="/" >
        
        <Image
          src={goback}
          height="30"
          width="30"
          className={` `}
          alt="go back"
        />
      </Link>
    </div>
  );
};

export default GoBack;
