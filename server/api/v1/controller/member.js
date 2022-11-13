const Member = require('../../models/member')

const memberLogin = async (req, res, next) => {
  try {

  } catch (err) {
    console.error(`controller member.js memberLogin err: ${err}`)
    next(err)
  }
}

const memberLogout = async (req, res, next) => {
  try {

  } catch (err) {
    console.error(`controller member.js memberLogout err:`, err);
    next(err)
  }
}

const memberRegist = async (req, res, next) => {
  try {
    const member = await Member.create({
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
    })
    console.log(`controller member.js memberRegist member: ${member}`);
    await member.save()
    const memberInfo = {
      memberId: member.id,
      email: member.email,
      nickname: member.nickname,
      role: member.role,
      created_at: member.created_at
    }
    console.log(`controller member.js memberRegist memberInfo: ${memberInfo}`);
    res
      .status(201)
      .json({
        success: true,
        memberInfo
      })
    
  } catch (err) {
    console.error(`controller member.js memberRegist err:`, err);
    next(err)
  }
}

const memberDetail = async (req, res, next) => {
  try {
    const member = await Member.findOne({
      where: {
        id: req.params.memberId
      }
    })
    const memberInfo = {
      memberId: member.id,
      email: member.email,
      nickname: member.nickname,
      role: member.role,
      created_at: member.created_at
    }
    console.log(`controller member.js memberDetail memberInfo: ${memberInfo}`);
    res
      .status(200)
      .json({
        success: true,
        memberInfo
      })
  } catch (err) {
    console.error(`controller member.js memberDetail err: ${err}`);
    next()
  }
}

const memberModify = async (req, res, next) => {
  try {
    const modifyRes = await Member.update({
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname
    }, {
      where: {
        id: req.body.memberId
      }
    })
    console.log(`controller member.js memberModify modifyRes:`, modifyRes);
    if (modifyRes[0]===1) {
      const member = await Member.findOne({
        where: {
          id: req.body.memberId
        }
      })
      const memberInfo = {
        memberId: member.id,
        email: member.email,
        nickname: member.nickname,
        role: member.role,
        created_at: member.created_at
      }
      res
        .status(201)
        .json({
          success: true,
          memberInfo
        })
    } else {
      res
        .status(409)
        .json({
          success: false,
          message: `변경사항 없음`
        })

    }
  } catch (err) {
    console.error(`controller member.js memberModify err: ${err}`);
    next()
  }
}

const memberWithdrawl = async (req, res, next) => {
  try {
    await Member.destroy({
      where: {
        id: req.params.memberId
      }
    })
    res
      .status(201)
      .json({success: true})
  } catch (err) {
    console.error(`controller member.js memberWithdrawl err: ${err}`);
    next()
  }
}

module.exports = {
  memberLogin,
  memberLogout,
  memberRegist,
  memberDetail,
  memberModify,
  memberWithdrawl,
}