import { google } from "googleapis";

export async function GET() {
  try {
    const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);
    key.private_key = key.private_key.replace(/\\n/g, "\n");
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
      range: "A:G",
    });

    const rows = res.data.values ?? [];
    // 첫 행이 헤더("이름")면 제외
    const dataRows =
      rows.length > 0 && rows[0][0] === "이름" ? rows.slice(1) : rows;

    // 최신순(마지막 행이 최신 → 역순)
    const data = [...dataRows].reverse().map((row, i) => ({
      no: dataRows.length - i,
      name: row[0] ?? "",
      phone: row[1] ?? "",
      status: row[2] ?? "",
      utm: row[3] ?? "",
      date: row[4] ?? "",
      course: row[5] ?? "",
      calculatorData: row[6] ?? "",
    }));

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("[get-submissions]", error);
    return Response.json(
      { success: false, error: "데이터 조회에 실패했습니다" },
      { status: 500 }
    );
  }
}
