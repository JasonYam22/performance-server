const router = require("express").Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      "https://api.nal.usda.gov/fdc/v1/foods/search",
      {
        params: {
          api_key: process.env.CALORIE_API_KEY,
          query,
          pageSize: 1,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;