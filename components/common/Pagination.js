import React, { Component } from 'react';
import PropTypes from 'prop-types';

// activeProps          상위 Component active (현재 page 값 필수)
// total                list colum 총 수 (필수)
// dataPerPage          보여줄 colum 수 (필수)
// handleChangePage     선택한 pageNo을 받기 위한 함수 (필수)
// nextNum              다음 페이지 시 이동 할 수 (default : 1)
// prevNum              이전 페이지 시 이동 할 수 (default : 5)
// superNextNum         슈퍼 다음 페이지 시 이동 할 수 (default : 1)
// superPrevNum         슈퍼 이전 페이지 시 이동 할 수 (default : 5)
// nextTag              원하는 Tag가 있을 시 교체 (default : myTag)
// prevTag                     "
// superNextTag                "
// superPrevTag                "
// paging Tag className = page  > Tag className = pagination

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNo: [],
      active: Number(this.props.activeProps)
    };

    this.totalPage = ''; //총 페이지의 수
    this.s_page = ''; //현재 블록의 시작 페이지
    this.e_page = ''; // 현재 블록의 끝 페이지
    this.pageSize = 5; // 한 화면에 나타낼 페이지 num 의 수
  }

  componentDidMount() {
    this.paging();
  }

  componentWillReceiveProps(nextProps) {
    this.paging(nextProps);
  }

  paging = nextProps => {
    const { total, dataPerPage } = this.props;
    let active = nextProps ? nextProps.activeProps : this.state.active;
    this.setState({
      active: nextProps ? nextProps.activeProps : this.state.active
    });
    this.totalPage = nextProps
      ? Math.ceil(nextProps.total / dataPerPage)
      : Math.ceil(total / dataPerPage);

    let pageBlock = Math.ceil(active / this.pageSize); // 지금 현재 속한 블록

    this.s_page = (pageBlock - 1) * this.pageSize + 1; //현재 블록의 시작 페이지
    this.e_page = pageBlock * this.pageSize;

    let itemArr = [];
    if (this.totalPage <= 5) {
      for (let i = 1; i <= this.totalPage; i++) {
        itemArr.push(i);
      }
    } else if (this.totalPage < this.e_page) {
      for (let i = this.s_page; i <= this.totalPage; i++) itemArr.push(i);
    } else {
      for (let i = this.s_page; i <= this.e_page; i++) {
        itemArr.push(i);
      }
    }
    this.setState({ pageNo: itemArr });
  };

  nextPage = pageNo => {
    const { handleChangePage, total, dataPerPage } = this.props;
    let totalPage = Math.ceil(total / dataPerPage);
    if (pageNo > totalPage)
      return this.setState({ active: totalPage }, () =>
        handleChangePage(this.state.active)
      );

    this.setState(
      {
        active: pageNo
      },
      () => handleChangePage(this.state.active)
    );
  };

  prevPage = pageNo => {
    const { handleChangePage } = this.props;
    if (pageNo < 1)
      return this.setState({ active: 1 }, () =>
        handleChangePage(this.state.active)
      );
    this.setState(
      {
        active: pageNo
      },
      () => handleChangePage(this.state.active)
    );
  };

  handlePage = pageNo => {
    const { handleChangePage } = this.props;
    this.setState(
      {
        active: pageNo
      },
      () => handleChangePage(this.state.active)
    );
  };

  render() {
    const { pageNo, active } = this.state;
    return (
      <div className="paging">
        <div className="pagination p1">
          <a
            onClick={() => this.prevPage(this.e_page - this.pageSize)}
            className={this.e_page - 5 < 1 ? 'disabled' : ''}
          >
            〈
          </a>
          <p>
            {pageNo.map(no => (
              <a
                key={no}
                href="javascript:;"
                data-item="1"
                onClick={() => this.handlePage(no)}
                className={active === no ? 'is-active disabled' : ''}
              >
                {no}
              </a>
            ))}
          </p>
          <a
            onClick={() => this.nextPage(this.s_page + this.pageSize)}
            className={this.s_page + 5 > this.totalPage ? 'disabled' : ''}
          >
            〉
          </a>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  dataPerPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  nextNum: PropTypes.number,
  superNextNum: PropTypes.number,
  prevNum: PropTypes.number,
  superPrevNum: PropTypes.number,
  nextTag: PropTypes.element,
  superNextTag: PropTypes.element,
  prevTag: PropTypes.element,
  superPrevTag: PropTypes.element
};

Pagination.defaultProps = {
  dataPerPage: 10,
  nextNum: 1,
  prevNum: 1,
  superPrevNum: 1
};

export default Pagination;
