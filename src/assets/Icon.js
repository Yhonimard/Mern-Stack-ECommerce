import { Box } from "@chakra-ui/react";

export function CartIcon({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g>
        <path
          fill="#323232"
          d="M5.605 11.442c.188 1.692.282 2.538.851 3.048.57.51 1.421.51 3.124.51h5.247c1.173 0 1.76 0 2.236-.287.476-.286.75-.805 1.3-1.841l2.467-4.663A1.505 1.505 0 0019.5 6H9.469c-2.086 0-3.128 0-3.725.666-.596.666-.48 1.703-.25 3.776l.11 1z"
          opacity="0.1"
        ></path>
        <path
          stroke="#323232"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5.605 11.442c.188 1.692.282 2.538.851 3.048.57.51 1.421.51 3.124.51h5.247c1.173 0 1.76 0 2.236-.287.476-.286.75-.805 1.3-1.841l2.467-4.663A1.505 1.505 0 0019.5 6v0H9.469c-2.086 0-3.128 0-3.725.666-.596.666-.48 1.703-.25 3.776l.11 1z"
        ></path>
        <path
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h.5v0c.664 0 1.222.5 1.296 1.16l.76 6.84"
        ></path>
        <path
          stroke="#323232"
          strokeWidth="2"
          d="M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
        ></path>
      </g>
    </svg>
  );
}

export function CartPlusIcon({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      fill="none"
      viewBox="0 0 24 24"
    >
      <g fill="#000">
        <path
          fillRule="evenodd"
          d="M8.735 14.018a1 1 0 01.876-.518h6.859c.75 0 1.41-.41 1.75-1.03l3.38-6.14a.99.99 0 00.113-.629A1 1 0 0021 4H6c-.033 0-.066.002-.098.005l-.17-.36A2 2 0 003.924 2.5H2.92a1 1 0 000 2h.225c.473 0 .904.273 1.107.7l2.828 5.963a2 2 0 01-.057 1.825L6.17 14.53c-.73 1.34.23 2.97 1.75 2.97h11a1 1 0 100-2H9.611a1 1 0 01-.876-1.482zm8.306-3.55L19.51 6H6.847l2.061 4.356a2 2 0 001.808 1.144h4.575a2 2 0 001.75-1.032z"
          clipRule="evenodd"
        ></path>
        <path d="M7.92 18.5c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM17.92 18.5c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM12.5 10.87h1v-1.5H15v-1h-1.5v-1.5h-1v1.5H11v1h1.5v1.5z"></path>
      </g>
    </svg>
  );
}

export function PlusIcon({ size }) {
  return (
    <Box cursor="pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6M12 9v6"
        ></path>
        <path
          stroke="#323232"
          strokeWidth="2"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </Box>
  );
}

export function MinusIcon({ size }) {
  return (
    <Box cursor="pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#323232"
          strokeWidth="2"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
        <path
          stroke="#323232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6"
        ></path>
      </svg>
    </Box>
  );
}
