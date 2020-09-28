import axios from "axios";
import winston from "winston";

import config from "@/config";
import ResponseError from "@/utils/response-error";

export type GiphyFilter = {
  q: string;
  limit: number;
};

export type GiphyResponse = {
  data: Array<{
    images: {
      original: {
        url: string;
      };
    };
  }>;
};

const getGifs = async (filter: GiphyFilter): Promise<GiphyResponse> => {
  try {
    const response = await axios.get<GiphyResponse>(config.giphy.api.url, {
      params: {
        api_key: config.giphy.api.key,
        ...filter,
      },
    });
    return response.data;
  } catch (err) {
    winston.debug(err.message);
    throw new ResponseError("Giphy API request failed");
  }
};

export default {
  getGifs,
};
