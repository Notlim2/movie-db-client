import Swal from "sweetalert2";

const showErrorMessage = async (error: any) => {
  const errorMessage = error.response
    ? error.response.data?.status_message
      ? error.response.data?.status_message
      : error.response.data?.message
    : error.message
    ? error.message
    : "Erro desconhecido";

  return await Swal.fire({ icon: "error", text: errorMessage });
};

export default showErrorMessage;
