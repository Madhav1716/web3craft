import { formatEther, formatUnits, Address } from "viem";

/**
 * Shortens an Ethereum address for display
 */
export const formatAddress = (
  address: Address | string | undefined,
  chars = 4
): string => {
  if (!address) return "";
  return `${address.substring(0, chars + 2)}...${address.substring(
    address.length - chars
  )}`;
};

/**
 * Format an Ethereum value with specified decimals and precision
 */
export const formatValue = (
  value: bigint | string | number,
  decimals = 18,
  precision = 4
): string => {
  if (typeof value === "undefined" || value === null) return "0";

  let valueString = value.toString();

  try {
    if (decimals === 18) {
      return parseFloat(formatEther(value as bigint)).toFixed(precision);
    } else {
      return parseFloat(formatUnits(value as bigint, decimals)).toFixed(
        precision
      );
    }
  } catch (e) {
    console.error("Error formatting value:", e);
    return "0";
  }
};

/**
 * Format a token amount with symbol
 */
export const formatTokenAmount = (
  amount: bigint | string | number,
  symbol: string,
  decimals = 18,
  precision = 4
): string => {
  return `${formatValue(amount, decimals, precision)} ${symbol}`;
};
