import React from 'react'
import { Chart } from 'react-google-charts'
import { withRouter } from 'next/router';
import { handleRouter } from '../../helpers/router'
import { checkStatus } from '../../helpers/utils'




class VotingDetail extends React.Component {
    static async getInitialProps({ query }) {
        return {query}
    }

    state = {
        status : 'on', // on : 진행중 / off : 마감 / before : 진행전
        info : {
            key : '',
            title : '',
            category : [],
            createUser : '',
            startTime : {
                yy : '',
                mm : '',
                dd : '',
                hh : '',
                mi : ''
            },
            endTime : {
                yy : '',
                mm : '',
                dd : '',
                hh : '',
                mi : ''
            },
            currVoting : {
                entryUser : [],
            }
        },
        selItem : '',
        currVote : [],
        userId : null,
        modify : {
            status : false,
            category : {}
        }
    }

    componentDidMount(){
        let info = JSON.parse(localStorage.getItem('list')).filter(item => item.key == this.props.query.id)[0]
        if(info != null || info != undefined){
            this.setState({
                info 
            }, () => this.sumVote())
        }else{
            handleRouter()
        }

        if(localStorage.getItem('id') != null){
            this.setState({
                userId : localStorage.getItem('id')
            })
        }
    }

    handleVoting = (e) => {
        this.setState({
            selItem : e.target.value
        })
    }

    toVote = () => {
        const { selItem, info } = this.state
        const { currVoting } = this.state.info
        let userId = localStorage.getItem('id')

        if(currVoting.entryUser.findIndex(item => Object.keys(item) == userId) != -1) return alert("이미 투표를 하셨습니다.")
        let entryUser = currVoting.entryUser.concat({ [userId] : selItem })
        this.setState({
            info : {
                ...this.state.info,
                currVoting : { entryUser }
            },
            currVote: []
        }, () =>  {
            let list = JSON.parse(localStorage.getItem('list'))
            let idx = list.findIndex(item => item.key == info.key)
            list.splice(idx, 1, this.state.info)
            localStorage.setItem('list', JSON.stringify(list))
            this.sumVote()
        })
    }

    sumVote = () =>{
        const { currVoting, startTime, endTime } = this.state.info
        if(currVoting.entryUser.length > 0){
            let newArr = []
            for(let i =0; i < currVoting.entryUser.length; i++){
                let vote = currVoting.entryUser[i][Object.keys(currVoting.entryUser[i])]
                if(newArr.length > 0){
                    let idx = newArr.findIndex(item => item[0] == vote)
                    if(idx != -1){
                        newArr.splice(idx, 1, [vote, ++newArr[idx][1]])
                    }else{
                        newArr.push([vote, 1])
                    }
                }else{
                    newArr.push([vote, 1])
                }
                this.setState({
                    currVote : newArr
                })
            }
        }

        
        let strChk = checkStatus(startTime.yy, startTime.mm, startTime.dd, startTime.hh, startTime.mi)
        let endChk = checkStatus(endTime.yy, endTime.mm, endTime.dd, endTime.hh, endTime.mi) 
        if(endChk && !strChk){
            this.setState({
                status : 'on'
            })
        }else if(!endChk && !strChk){
            this.setState({
                status : 'off'
            })
        }else if(endChk && strChk){
            this.setState({
                status : 'before'
            })
        }

    }

    delVote = () => {
        if(confirm('정말 삭제하시겠습니까?')){
            const { key } = this.state.info
            let list = JSON.parse(localStorage.getItem('list'))
            let idx = list.findIndex(item => item.key == key)
            list.splice(idx, 1)
            localStorage.setItem('list', JSON.stringify(list))
            handleRouter()
        }
    }

    handleCategory = (e) => {
        let modifyCategory = e.target.placeholder
        this.setState({
            modify : {
                ...this.state.modify,
                category : {
                    ...this.state.modify.category,
                    [modifyCategory] : e.target.value
                }
            }
        })
    }

    handleModify = () => {
        const { status, category } = this.state.modify
        const { info } = this.state

        if(status){
            if(confirm("정말 변경하시겠습니까?")){
                info.category.map((item, index) => {
                    let oriKeys = Object.keys(item)
                    let oriValues = item[oriKeys]
                    let chkPoint = Object.keys(category)
                    let findIdx = chkPoint.indexOf(oriValues)
                    if(findIdx >= 0 && category[chkPoint[findIdx]] != '' && category[chkPoint[findIdx]] != undefined ){
                        let modifyCategory = info.category
                        modifyCategory.splice(index, 1, {[oriKeys] : category[chkPoint[findIdx]]})
                        this.setState({
                            info : {
                                ...this.state.info,
                                category : modifyCategory
                            }
                        })
                    }
                })
                let list = JSON.parse(localStorage.getItem('list'))
                let idx = list.findIndex(item => item.key == info.key)
                list.splice(idx, 1, this.state.info)
                localStorage.setItem('list', JSON.stringify(list))
                this.setState({
                    modify : {
                        ...this.state.modify,
                        status : !status
                    }
                })
                this.sumVote()
            }
        }else{
            this.setState({
                modify : {
                    ...this.state.modify,
                    status : !status
                }
            })
        }
    }

    render(){
        const { info, selItem, currVote, userId, modify, status } = this.state
        console.log("!!", info)
        return (
            <div className="detail">
                <div className="detailBox">
                    <h1>Detail</h1>
                    {userId == info.createUser && 
                        <div className="btnBox">
                            <button className="smallButton" onClick={() => this.handleModify()}>{modify.status ? '저장' : '변경'}</button>
                            {modify.status && <button onClick={() => this.setState({modify : {...modify, status : false}})} className="smallButton">취소</button>}
                            {!modify.status && <button onClick={() => this.delVote()} className="smallButton">삭제</button>}
                        </div>
                    }
                    <table>
                      <tbody>
                            <tr>
                                <th>
                                    제목 :
                                </th>
                                <td>
                                    {info.title}
                                </td>
                                <th>
                                    생성자 :
                                </th>
                                <td>
                                    {info.createUser}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    시작일 :
                                </th>
                                <td>
                                    {info.startTime.yy+'-'+info.startTime.mm+'-'+info.startTime.dd+' '+info.startTime.hh+":"+info.startTime.mi}
                                </td>
                                <th>
                                    마감일 :
                                </th>
                                <td>
                                    {info.endTime.yy+'-'+info.endTime.mm+'-'+info.endTime.dd+' '+info.endTime.hh+":"+info.endTime.mi}
                                </td>
                            </tr>
                          
                      </tbody>
                    </table>
                    {modify.status ? 
                        <div className="cellBox">
                            <div className="cellBox">
                            {info.category.map((item, idx) =>
                                <span key={idx}>
                                    <input type="text" placeholder={item[Object.keys(item)[0]]} onChange={(e) => this.handleCategory(e)}/>
                                </span>
                            )}
                        </div>
                        </div>
                        :
                        <div className="cellBox">
                            {info.category.map((item, idx) =>
                                <span key={idx}>
                                    <label >{item[Object.keys(item)[0]]}<input type="radio" className="pointer" value={item[Object.keys(item)[0]]} checked={selItem == item[Object.keys(item)[0]]} onChange={e => this.handleVoting(e)}/></label>
                                </span>
                            )}
                        </div>
                    }
                    <div className="chart">
                        <Chart
                            width={'550px'}
                            height={'250px'}
                            chartType="PieChart"
                            loader={<div>투표내역이 없습니다.</div>}
                            data={[
                                ['Task', 'Hours per Day'],
                                ...currVote
                            ]}
                            options={{
                                title: '현재 투표 현황',
                                backgroundColor : '#e8e8e8'
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </div>
                    {!modify.status && status == 'on' && <button className="bigButton" onClick={() => this.toVote()}>투표하기</button>}
                    {!modify.status && status == 'off' && <button className="bigButton gray" disabled> 마감되었습니다. </button>}
                    {!modify.status && status == 'before' && <button className="bigButton gray" disabled> 투표 진행전입니다. </button>}
                </div>
            </div>
        )
    }
}

export default withRouter(VotingDetail)