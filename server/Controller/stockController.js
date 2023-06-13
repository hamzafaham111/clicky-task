const Stocks = require("../Model/stockSchema");
const CSV = require("csvtojson");
const { response } = require("../Routes/stockRoute");
const CsvParser = require("json2csv").Parser;
const importStock = async (req, res) => {
  try {
    var stockData = [];
    CSV()
      .fromFile(req.file.path)
      .then(async (res) => {
        for (let x = 0; x < res.length; x++) {
          stockData.push({
            variant: res[x].variant,
            stock: res[x].stock,
          });
        }

        //  const inDataBase = new Stocks(stockData);
        //  const saved = await inDataBase.save();
        // console.log(saved);
        await Stocks.insertMany(stockData);
      });
    res.send({ status: 200, success: true, msg: "CSV File Imported" });
  } catch (error) {
    res.send({ status: 400, success: true, msg: error.message });
  }
};

const exportStock = async (req, res) => {
  console.log("got it here");
  try {
    let data = [];
    const stockData = await Stocks.aggregate([
      {
        $group: {
          _id: "$variant",
          stock: { $addToSet: "$stock" },
        },
      },
    ]);
    console.log(stockData);
    // const stockData = await Stocks.find({});

    stockData.forEach((val) => {
      const { _id, stock } = val;
      data.push({ variant: _id, stock: stock.join(" | ") });
    });
    const csvFields = ["variant", "stock"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(data);

    res.setHeader("content-type", "text/csv");
    res.setHeader("content-Disposition", "attatchment: filename=stockData.csv");
    res.status(200).end(csvData);
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
    console.log(error.message);
  }
};
module.exports = {
  importStock,
  exportStock,
};
