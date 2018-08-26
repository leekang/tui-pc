#### 举个栗子

	<Checker name="action" defaultValue="pass" multiple={false}>
		<Row>
			<CheckerItem value="pass" theme="radio">
				<Row align="center">
					<div className="checker-radio m-r-xs"></div>通过
				</Row>
			</CheckerItem>
			<CheckerItem value="fail" theme="radio" className="m-l" >
				<Row align="center">
					<div className="checker-radio m-r-xs"></div>驳回
				</Row>
			</CheckerItem>
		</Row>
	</Checker>

