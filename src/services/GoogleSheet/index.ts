import {GoogleSpreadsheet} from 'google-spreadsheet'

import config from '@config'

class GoogleSheet {
  doc = null
  sheetId = null

  logins: Array<number | string> = []

  constructor(sheetId) {
    this.sheetId = sheetId
    this._initialize(sheetId)
  }

  async _initialize(sheetId) {
    if (this.doc) return

    const doc = new GoogleSpreadsheet(sheetId)

    await doc.useServiceAccountAuth({
      client_email: config.GOOGLE_SHEET_KEYS.client_email,
      private_key: config.GOOGLE_SHEET_KEYS.private_key,
    })

    await doc.loadInfo()

    this.doc = doc
  }

  async _getSheetByName(name) {
    await this._initialize(this.sheetId)

    // @ts-ignore
    return this.doc.sheetsByTitle[name]
  }

  async isLogin(id) {
    const sheet = await this._getSheetByName('123')
    const rows = await sheet.getRows()

    const index = rows.findIndex((row) => row.tid === String(id))

    return index !== -1
  }

  async getEmployee(id) {
    const sheet = await this._getSheetByName('123')
    const rows = await sheet.getRows()

    return rows.find((row) => row.tid === String(id))
  }

  async getEmployeeProfitIn15Days(id) {
    const employee = await this.getEmployee(id)

    if (!employee) return

    const sheet = await this._getSheetByName('15day')
    const rows = await sheet.getRows()

    const row = rows.find((row) => row.name === employee.name)

    return {
      profit: row?.profit,
      startDate: row?.startDate,
      endDate: row?.endDate,
    }
  }

  async loginEmployee(id, data) {
    const sheet = await this._getSheetByName('123')
    const rows = await sheet.getRows()

    await sheet.loadCells()

    const index = rows.findIndex((row) => row.id === id)

    if (index === -1 || rows[index]?.tid === data.tid) return

    const cell = sheet.getCell(index + 1, 2)

    cell.value = data.tid

    await sheet.saveUpdatedCells()
  }

  // @todo find a better way
  hasLogin(id) {
    return this.logins.includes(id)
  }

  cleanLogin(id) {
    this.logins = this.logins.filter((i) => i !== id)
  }

  pushLogins(id) {
    this.logins.push(id)
  }
}

export default new GoogleSheet(config.GOOGLE_SHEET_ID)
