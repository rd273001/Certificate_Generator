import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent( Swal );

const sweetAlert = ( { title, text, icon, ...props } ) => {
  const color = icon === 'error' ? 'bg-red-500' : icon === 'success' ? 'bg-green-500' : icon === 'info' ? 'bg-blue-400' : 'bg-green-500';
  MySwal.fire( {
    text,
    title: title ?? 'Success!',
    icon: icon ?? 'success',
    toast: true,
    timer: props?.timer ?? 4000,
    timerProgressBar: true,
    customClass: {
      popup: 'bg-purple-100 rounded-xl pb-10',
      timerProgressBar: `${ props?.timerColor ?? color } h-[7px]`
    },
    ...props
  } );
};

export default sweetAlert;