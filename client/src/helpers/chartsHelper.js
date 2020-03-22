export const createPieChart = (var1, var2) => {
  const PIE = {
    type: 'pie',
    data: {
      //   x: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
      y0: [var1.value],
      y1: [var2.value]
    },
    names: {
      y0: var1.name,
      y1: var2.name
    },
    colors: {
      y0: '#2373DB',
      y1: '#F7DB4F'
    }
  };
};
