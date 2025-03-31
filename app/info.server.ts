import { google } from "googleapis";
import credentials from "./credentials.json";
import "dotenv/config";

type Entry = {
  order: string;
  body: {
    period?: string;
    name?: string;
    type?: string;
    content?: string;
  };
};

type TransformedData = Record<string, Entry[]>;

// const credentials = {
//   type: process.env.type,
//   project_id: process.env.project_id,
//   private_key_id: process.env.private_key_id,
//   private_key: process.env.private_key,
//   client_email: process.env.client_email,
//   client_id: process.env.client_id,
//   auth_uri: process.env.auth_uri,
//   token_uri: process.env.token_uri,
//   auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
//   client_x509_cert_url: process.env.client_x509_cert_url,
//   universe_domain: process.env.universe_domain,
// };

const spreadsheetId = process.env.SPREADSHEET_ID;

export async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const responseDepth1 = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "depth1",
  });
  const responseDepth2 = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "depth2",
  });

  const data1 = responseDepth1.data.values?.slice(1);
  const result1 = {};

  if (data1) {
    for (let i = 0; i < data1[0].length; i++) {
      const category = data1[0][0];
      result1[category] = {};

      for (let j = 0; j < data1.length; j++) {
        const key = data1[j][1];
        const value = data1[j][i];
        result1[category][key] = value;
      }
    }
  }

  const data2 = responseDepth2.data.values?.slice(1);

  const transformed: TransformedData = {};

  if (data2) {
    let currentCategory = "";
    let currentEntry: Entry | null = null;

    for (const row of data2) {
      const [category, order, key, value] = row;

      if (category) {
        currentCategory = category.replace(/\s+/g, "-").toLowerCase();
        transformed[currentCategory] = [];
      }

      if (order) {
        currentEntry = {
          order,
          body: { period: "", name: "", type: "", content: "" },
        };
        currentEntry.body[key] = value;
        if (currentEntry) {
          transformed[currentCategory].push(currentEntry);
        }
      }

      if (currentEntry && key && value) {
        currentEntry.body[key] = value;
      }
    }

    if (currentEntry) {
      transformed[currentCategory].push(currentEntry);
    }
  }

  // TODO: order에 따른 sort 기능 추가해야 함

  const contentKeys = Object.keys(transformed);
  const result2 = contentKeys.reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: transformed[cur],
    };
  }, {});

  return {
    ...result1,
    sheetData: result2,
  };
}

export async function getCategoryKeys() {
  const data = await getSheetData();

  return {
    categories: Object.keys(data.sheetData),
  };
}

export async function getCategoryData(category: any) {
  const data = await getSheetData();

  return data?.sheetData[category];
}
