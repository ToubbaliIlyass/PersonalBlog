const nodejs = ({ width }: { width: string }) => {
  return (
    <svg width={width} viewBox="0 0 128 128">
      <path
        fill="url(#a)"
        d="M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z"
      ></path>
      <path
        fill="url(#b)"
        d="M116.897 29.76 66.841.825A8.161 8.161 0 0 0 65.302.23L9.21 96.798a6.251 6.251 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.702 3.702 0 0 0-1.302-1.072z"
      ></path>
      <path
        fill="url(#c)"
        d="M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z"
      ></path>
      <defs>
        <linearGradient
          id="a"
          x1="34.513"
          x2="27.157"
          y1="15.535"
          y2="30.448"
          gradientTransform="translate(-129.242 -73.715) scale(6.18523)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3F873F"></stop>
          <stop offset=".33" stop-color="#3F8B3D"></stop>
          <stop offset=".637" stop-color="#3E9638"></stop>
          <stop offset=".934" stop-color="#3DA92E"></stop>
          <stop offset="1" stop-color="#3DAE2B"></stop>
        </linearGradient>
        <linearGradient
          id="b"
          x1="30.009"
          x2="50.533"
          y1="23.359"
          y2="8.288"
          gradientTransform="translate(-129.242 -73.715) scale(6.18523)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".138" stop-color="#3F873F"></stop>
          <stop offset=".402" stop-color="#52A044"></stop>
          <stop offset=".713" stop-color="#64B749"></stop>
          <stop offset=".908" stop-color="#6ABF4B"></stop>
        </linearGradient>
        <linearGradient
          id="c"
          x1="21.917"
          x2="40.555"
          y1="22.261"
          y2="22.261"
          gradientTransform="translate(-129.242 -73.715) scale(6.18523)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".092" stop-color="#6ABF4B"></stop>
          <stop offset=".287" stop-color="#64B749"></stop>
          <stop offset=".598" stop-color="#52A044"></stop>
          <stop offset=".862" stop-color="#3F873F"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default nodejs;
