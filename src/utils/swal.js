import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const AppSwal = async (title, text, icon, cancelButton) => {
  //   https://github.com/sweetalert2/sweetalert2-react-content
  const MySwal = withReactContent(Swal);
  return await MySwal.fire({
    title: <strong>{title}</strong>,
    html: <i>{text}</i>,
    icon: icon,
    showCancelButton: cancelButton ? true : false,
  });
};
