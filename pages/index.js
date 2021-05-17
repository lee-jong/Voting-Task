import React from 'react';
import PageNation from '../components/common/Pagination'

import { handleRouter } from '../helpers/router'
import { checkStatus } from '../helpers/utils'


class Home extends React.Component {
  static async getInitialProps({}) {
    return {};
  }

  state = {
    list : [],
    pagingList : [],
    pageInfo : {
      active : 1,
      limit : 8
    }
  }

  componentDidMount(){
    if(localStorage.getItem('list') != null){
      this.setState({
        list : JSON.parse(localStorage.getItem('list')).reverse()
      }, () => this.paging())
    }
  }

  paging = () => {
    const { list, pageInfo } = this.state
    this.setState({
      pagingList : list.slice((pageInfo.active - 1) * pageInfo.limit, pageInfo.active * pageInfo.limit)
    })
  }

  handlePage = (num) => {
    this.setState({
        pageInfo : {
          ...this.state.pageInfo,
          active: num
        }
    }, () => this.paging());
  };

  arrangeIndex = (index) => {
    const { list } = this.state
    const { active, limit } = this.state.pageInfo
    return list.length - (((active - 1) * limit) + index )
  }

  voteStatus = (startTime, endTime) => {
    let res = ''
    let strChk = checkStatus(startTime.yy, startTime.mm, startTime.dd, startTime.hh, startTime.mi)
    let endChk = checkStatus(endTime.yy, endTime.mm, endTime.dd, endTime.hh, endTime.mi) 
    if(endChk && !strChk){
        res = '진행중'
    }else if(!endChk && !strChk){
        res = '마감'
    }else if(endChk && strChk){
        res = '시작전'
    }
    return res
  }


  render() {
    const { list, pageInfo, pagingList } = this.state
    return (
      <>
        <div className="main">
          <div className="mainBox">
            <h1>List</h1>
            <button onClick={() => handleRouter('voting/add')}>만들기</button>
            <table className = "votingList">
              <colgroup>
                <col className="col100"/>
                <col className="colAuto"/>
              </colgroup>
              <thead>
                <tr>
                    <td>NO.</td>
                    <td>제목</td>
                    <td>시작일</td>
                    <td>마감일</td>
                    <td>생성자</td>
                    <td>상태</td>
                </tr>
              </thead>
              <tbody>
                {list.length <= 0 && 
                  <tr>
                    <td colSpan="6">
                      생성된 투표가 존재하지 않습니다.
                    </td>
                  </tr>
                }
                {pagingList.length > 0 && pagingList.map((item, idx) => (
                  <tr key={idx} onClick={() => handleRouter(`voting/detail?id=${item.key}`)} className="pointer">
                      <td>{this.arrangeIndex(idx)}</td>
                      <td>{item.title}</td>
                      <td>{item.startTime.yy+'-'+item.startTime.mm+'-'+item.startTime.dd+' '+item.startTime.hh+":"+item.startTime.mi}</td>
                      <td>{item.endTime.yy+'-'+item.endTime.mm+'-'+item.endTime.dd+' '+item.endTime.hh+":"+item.endTime.mi}</td>
                      <td>{item.createUser}</td>
                      <td>{this.voteStatus(item.startTime, item.endTime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PageNation
              total={list.length}
              activeProps={pageInfo.active}
              dataPerPage={8}
              handleChangePage={this.handlePage}/>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
