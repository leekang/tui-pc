import React, { Component } from 'react';
import {Row,Col,Tool,SelectPkg,Input} from 'tui';
import classNames from 'classnames';

export default class Pagination extends Component {
	static defaultProps = {
		theme:'default',
		gutter:8,
		total:100,
		pageSize:10,
		defaultCurrent:1,
		numberSize:5,
		pageSizeOptions:['10','20','30','40']
 /*   onShowSizeChange*/
		//onChange
		//showSizeChanger
		//showQuickJumper
	}
	constructor(props){
		super(props)
		this.pageSize = props.pageSize;
	}
	pageNumbers = [];
	componentDidMount(){
		const {numberSize,defaultCurrent} = this.props;
		this.toPage(defaultCurrent)
	}
	current = 0;
	startPage = 0;
	endPage = 0;
	pages = 0;

	//change 是否出发change事件，pageCheck是否检测合法页数
	toPage(page,change,pageCheck){
		const {numberSize,total} = this.props;
		let pages = Math.ceil(total/this.pageSize);
		if(pageCheck && (!page || page < 1 || page > pages)){
			return;
		}
		let startPage = page - Math.floor(numberSize/2);
		if(startPage < 1){
			startPage = 1;
		}
		let endPage = startPage + numberSize - 1;
		if(endPage > pages){
			endPage = pages;
			startPage = pages - numberSize + 1;
			startPage = startPage > 1?startPage:1;
		}

		this.current = page;
		if(this.current > pages){
			this.current = pages;
		}
		this.startPage = startPage;
		this.endPage = endPage;
		this.pages = pages;
		this.pageNumbers = Tool.newArray(startPage,endPage + 1);
		if(change){
			this.onChange();
		}
		this.setState({})
	}
	onChange(){
		this.props.onChange && this.props.onChange(this.current);
	}
	onShowSizeChange(v){
		this.pageSize = v;
		this.toPage(this.current)
		this.props.onShowSizeChange && this.props.onShowSizeChange();
	}
	jump(e){
		if(e){
			e.preventDefault();
		}
		let val = this.refs.ipt.getValue();
		this.refs.ipt.setValue('')
		this.toPage(parseInt(val),true,true)
	}
	render() {
		let moreImg = 'https://s10.mogucdn.com/mlcdn/c45406/170802_0gcka5l0e2cacei5k868flldbjcjf_64x64.png';
		let prevImg = 'https://s10.mogucdn.com/mlcdn/c45406/170727_06ik6lff20jfejfg8ji2hhk688bdh_34x64.png';
		let nextImg = 'https://s10.mogucdn.com/mlcdn/c45406/170727_8gi9ie0662756j6ie7kddf6hafaj3_34x64.png';
		const {
			className,
			numberSize,
			theme,
			gutter,
			total,
			showTotal,
			pageSizeOptions,
			showSizeChanger,
			showQuickJumper} = this.props;
		let pageSize = this.pageSize;
		let pageOpt = pageSizeOptions.map((v)=>{
			return {
				name:v+'条/页',
				value:v
			}
		})
		return (
			<div className={classNames("tui-pagination","tui-pagination-"+theme,className)}>
				<Row gutter={gutter} align="center">
					<If condition={showTotal}>
						<Col>{showTotal(total,[(this.current-1)*pageSize +1,this.current*pageSize],this.pages,this.current)}</Col>
					</If>
					<Col>
						<If condition={this.startPage == 1}>
							<div className="flex-center tui-pagination-item disabled">
								<img className="tui-pagination-prev" src={prevImg} />
							</div>
						</If>
						<If condition={this.startPage != 1}>
							<div className="flex-center tui-pagination-item" onClick={this.toPage.bind(this,this.current-1,true)}>
								<img className="tui-pagination-prev" src={prevImg} />
							</div>
						</If>
					</Col>
					<If condition={this.startPage > 1}>
						<Col>
							<div className="flex-center tui-pagination-item" onClick={this.toPage.bind(this,1,true)}>{1}</div>
						</Col>
					</If>
					<If condition={this.startPage > 2}>
						<Col>
							<div className="h-full flex-center padder-xs" onClick={this.toPage.bind(this,this.current - numberSize,true)}>
								<img className="tui-pagination-more" src={moreImg} />
							</div>
						</Col>
					</If>
					<For each="item" of={this.pageNumbers}>
						<Col key={item}>
							<div className={classNames("flex-center tui-pagination-item",{
								active:this.current == item
							})} onClick={this.toPage.bind(this,item,true)}>{item}</div>
						</Col>
					</For>
					<If condition={this.endPage < this.pages -1}>
						<Col>
							<div className="h-full flex-center padder-xs" onClick={this.toPage.bind(this,this.current + numberSize,true)}>
								<img className="tui-pagination-more" src={moreImg} />
							</div>
						</Col>
					</If>
					<If condition={this.endPage < this.pages}>
						<Col>
							<div className="flex-center tui-pagination-item" onClick={this.toPage.bind(this,this.pages,true)}>{this.pages}</div>
						</Col>
					</If>

					<Col>
						<If condition={this.endPage == this.pages}>
							<div className="flex-center tui-pagination-item disabled">
								<img className="tui-pagination-prev" src={nextImg} />
							</div>
						</If>
						<If condition={this.endPage != this.pages}>
							<div className="flex-center tui-pagination-item" onClick={this.toPage.bind(this,this.current+1,true)}>
								<img className="tui-pagination-prev" src={nextImg} />
							</div>
						</If>
					</Col>
					<If condition={showSizeChanger}>
						<Col className="tui-pagination-pageSizeOpt">
							<SelectPkg data={pageOpt} defaultValue={pageSize} onChange={this.onShowSizeChange.bind(this)}/>
						</Col>
					</If>
					<If condition={showQuickJumper}>
						<Col>
							<Row align="center">
								跳至
								<div className="padder-xs">
									<form onSubmit={this.jump.bind(this)}>
										<Input className="tui-pagination-jumper-ipt" ref="ipt"/>
									</form>
								</div>
								页
							</Row>
						</Col>
					</If>
				</Row>
			</div>
		)
	}
}
