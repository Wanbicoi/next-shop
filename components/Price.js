function Price({ currency, num, numSize }) {
  if (num)
    return (
      <>
        <span className={numSize}>{num}</span>&nbsp;
        {currency}
      </>
    );
}

export default Price;
