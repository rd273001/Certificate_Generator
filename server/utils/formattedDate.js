exports.formattedDate = ( dateString ) => {
  const fullDate = new Date( dateString );
  const date = fullDate.getDate() < 10 ? `0${ fullDate.getDate() }` : `${ fullDate.getDate() }`;
  const month = fullDate.getMonth() < 9 ? `0${ fullDate.getMonth() + 1 }` : `${ fullDate.getMonth() + 1 }`;
  const year = `${ fullDate.getFullYear() }`;
  return `${ date }/${ month }/${ year }`;
};