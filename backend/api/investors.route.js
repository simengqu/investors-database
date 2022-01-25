import express from "express"
import InvestorsCtrl from "./investors.controller.js"

const router = express.Router()

router.route("/").get(InvestorsCtrl.apiGetInvestors)
router.route("/types").get(InvestorsCtrl.apiGetInvestorType)
router.route("/industry").get(InvestorsCtrl.apiGetInvestorIndustry)
router.route("/investmentSize").get(InvestorsCtrl.apiGetInvestorInvestmentSize)
router.route("/locations").get(InvestorsCtrl.apiGetInvestorLocation)

export default router