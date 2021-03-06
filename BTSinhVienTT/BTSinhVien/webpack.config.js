module.exports = {
	entry: ["./main.js"], //File build webpack [có thể build nhiều file]
	output: {
	path: __dirname, //đường dẫn sau khi build webpack file sẽ chưa ở đó
	filename: "bundle.js"
},
module: {
	loaders: [ //Module loader [phải cài đặt module mới sử dụng được]
		{ test: /\.css$/, loader: "style-loader!css-loader" }, // Set thuộc tính để build file css
        { test:/\.scss$/, loader:"style-loader!css-loader!sass-loader"},
        {test:/\.(png|jpg|gif|svg)$/, loader:'url-loader?limit=10000&name=hinhanh/[hash:12].[ext]'}
    ]
	}
};
