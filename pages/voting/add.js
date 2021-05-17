import React from 'react'
import * as Icon from 'react-bootstrap-icons';

import { handleRouter } from '../../helpers/router'
import { yearList, monthList, dayList, hourList, minuteList, getDate, getKey, stringToDate } from '../../helpers/utils'


let nowDate = new Date()

class AddVoting extends React.Component {
    state = {
        votingInfo  : {
            key : '',
            title : '',
            category : [{1 : ''}, {2 : ''}, {3 : ''}],
            createUser : '',
            startTime : {
                yy : getDate(nowDate, 'YY'),
                mm : getDate(nowDate, 'MM'),
                dd : getDate(nowDate, 'DD'),
                hh : getDate(nowDate, 'HH'),
                mi : '00'
            },
            endTime : {
                yy : getDate(nowDate, 'YY'),
                mm : getDate(nowDate, 'MM'),
                dd : getDate(nowDate, 'DD'),
                hh : getDate(nowDate, 'HH'),
                mi : '55'
            },
            currVoting : {
                entryUser : [],
            }
        },
    }

    componentDidMount(){
        let { votingInfo } = this.state
        this.setState({
            votingInfo : {
                ...votingInfo,
                createUser : localStorage.getItem('id'),
                key : getKey()
            }
        })
    }


    handleInfo = (e, key) => {
        let name = e.target.name;
        let value = e.target.value
        let { votingInfo } = this.state

        let idx = votingInfo.category.findIndex(item => Object.keys(item) == key)
        if(name == 'category' && idx !== -1){
            let category = [...votingInfo.category]
            let item = category[idx]
            item[key] = value
      
            this.setState({
                votingInfo : {
                    ...votingInfo,
                    category 
                }
            })
        }

        if(name != 'category'){
            this.setState({
                votingInfo : {
                    ...votingInfo,
                    [name] : value
                }
            })
        }
    }

    handleCategory= (type, key) =>{
        let { category } = this.state.votingInfo
            
        if(type == 'add'){
            if(category.length >= 10 ) return alert("항목은 최대 10개까지 만들 수 있습니다.")
            let lastItem = Number(Object.keys(category[category.length - 1])) + 1
            this.setState({
                votingInfo : {
                    ...this.state.votingInfo,
                    category : category.concat({[lastItem] : ''})
                }
            })
        }else{
            if(category.length <= 3) return alert("투표 생성 시, 항목은 최소 3개가 필요합니다.")
            let idx = category.findIndex(item => Object.keys(item) == key)
            this.setState({
                votingInfo : {
                    ...this.state.votingInfo,
                    category : category.slice(0, idx).concat(category.slice(idx + 1, category.length))
                }
            })
        }
    }

    handleDate = (e, id) => {
        let name = e.target.name;
        let value = e.target.value
        this.setState({
            votingInfo : {
                ...this.state.votingInfo,
                [id] : {
                    ...this.state.votingInfo[id],
                    [name] : value
                }
            }
        })
    } 

    addVoting = () => {
        const { votingInfo } =  this.state
        const { startTime, endTime } =  this.state.votingInfo

        if(votingInfo.title.replace(/ /g,"").length == 0 ) return alert("제목을 입력하여주세요.")
        let chk = false
        votingInfo.category.map(item => {
            if(item[Object.keys(item)].replace(/ /g,"").length == 0 ) chk = true
        })
        if(chk) return alert("항목을 모두 입력하여 주세요.")

        if(stringToDate(startTime.yy, startTime.mm, startTime.dd, startTime.hh, startTime.mi) >= stringToDate(endTime.yy, endTime.mm, endTime.dd, endTime.hh, endTime.mi))
        return alert("시작일과 마감일을 확인하여 주세요.")

        let list = JSON.parse(localStorage.getItem('list'))
        if(list == null){
            localStorage.setItem('list', JSON.stringify([{...votingInfo}]))
        }else{
            list.push({...votingInfo})
            localStorage.setItem('list', JSON.stringify(list))
        }

        handleRouter()
    }


    render(){
        const { votingInfo } = this.state
        const { startTime, endTime } = this.state.votingInfo
        return (
            <div className="add">
                <div className="addBox">
                    <h1>Create</h1>
                    <div>
                        <div>
                            <span>제목</span>
                            <div>
                                <input type="text" name="title" onChange={(e) => this.handleInfo(e)} autoComplete='off'/>
                            </div>
                        </div>
                        <div>
                            <span>시작일</span>
                            <div>
                                <select name="yy" onChange={(e) => this.handleDate(e, 'startTime')} value={startTime.yy}>
                                    { yearList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 년
                                <select name="mm" onChange={(e) => this.handleDate(e, 'startTime')} value={startTime.mm}>
                                    { monthList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 월
                                <select name="dd" onChange={(e) => this.handleDate(e, 'startTime')} value={startTime.dd}>
                                    { dayList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 일
                                <select name="hh" onChange={(e) => this.handleDate(e, 'startTime')} value={startTime.hh}>
                                    { hourList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 시
                                <select name="mi" onChange={(e) => this.handleDate(e, 'startTime')} value={startTime.mi}>
                                    { minuteList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 분
                            </div>
                        </div>
                        <div>
                            <span>마감일</span>
                            <div>
                                <select name="yy" onChange={(e) => this.handleDate(e, 'endTime')} value={endTime.yy}>
                                    { yearList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 년
                                <select name="mm" onChange={(e) => this.handleDate(e, 'endTime')} value={endTime.mm}>
                                    { monthList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 월
                                <select name="dd" onChange={(e) => this.handleDate(e, 'endTime')} value={endTime.dd}>
                                    { dayList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 일
                                <select name="hh" onChange={(e) => this.handleDate(e, 'endTime')} value={endTime.hh}>
                                    { hourList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 시
                                <select name="mi" onChange={(e) => this.handleDate(e, 'endTime')} value={endTime.mi}>
                                    { minuteList().map(item => <option value={item} key={item}>{item}</option>) }
                                </select> 분
                            </div>
                        </div>
                        <div>
                            <span>항목</span>
                            <span className="icon" onClick={() => this.handleCategory('add')}><Icon.FilePlus size={14}/></span>
                            {votingInfo.category.map((item, n) => 
                            <div key={n} className="cell">
                                <div>
                                    {n + 1} 째 항목
                                </div>
                                <div>
                                    <input type="text" name="category" onChange={(e) => this.handleInfo(e, Object.keys(item)[0])} autoComplete='off'/>
                                </div>
                                <span className="icon" onClick={() => this.handleCategory('del', Object.keys(item)[0])}><Icon.FileMinus size={14}/></span>
                            </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <button onClick={() => this.addVoting()}>생성</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddVoting