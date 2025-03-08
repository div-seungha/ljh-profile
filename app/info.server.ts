import { google } from "googleapis";
import credentials from "./credentials.json";

type Entry = {
  order: string;
  body: {
    period: string;
    name: string;
    type: string;
  };
};

type TransformedData = Record<string, Entry[]>;

export async function getSheetData() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SPREADSHEET_ID;

  const responseDepth1 = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "depth1",
  });
  const responseDepth2 = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "depth2",
  });

  const data1 = responseDepth1.data.values;
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

  const data2 = responseDepth2.data.values;

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
        currentEntry = { order, body: { period: "", name: "", type: "" } };
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
  const result2 = transformed;
  return {
    ...result1,
    education: result2.education,
    projects: result2.projects,
    works: result2.works,
    tutoring: result2.tutoring,
    publishing: result2.publishing,
  };
}
