function Price({ currency, num, numSize }) {
  return (
    <>
      <span className={numSize}>{num}</span>&nbsp;
      {currency}
    </>
  );
}

export default Price;
