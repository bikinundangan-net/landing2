import { google } from "googleapis";

function getSheetsClient(spreadsheetId: string | null | undefined) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const resolvedSpreadsheetId =
    spreadsheetId?.trim() || process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();

  if (!email || !key || !resolvedSpreadsheetId) {
    return null;
  }

  const auth = new google.auth.JWT({
    email,
    key: key.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return {
    sheets: google.sheets({ version: "v4", auth }),
    spreadsheetId: resolvedSpreadsheetId,
  };
}

export async function appendSheetRow(
  sheetName: string,
  row: (string | number)[],
  spreadsheetId?: string | null,
) {
  const client = getSheetsClient(spreadsheetId);

  if (!client) {
    return;
  }

  try {
    await client.sheets.spreadsheets.values.append({
      spreadsheetId: client.spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });
  } catch (error) {
    console.error(`Failed to sync to Google Sheets (${sheetName})`, error);
  }
}
