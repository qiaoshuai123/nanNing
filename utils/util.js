function initTreeJson(treeJson, idKey, pidKey, childKey) {
	idKey = idKey || 'id'
	pidKey = pidKey || 'pid'
	childKey = childKey || 'children'
	var ret = []
	var initChild = function(node) {
		for(var i = 0; i < treeJson.length; i++) {
			var cur = treeJson[i]
			if(node[idKey] === cur[pidKey]) {
				(node[childKey] || (node[childKey] = [])).push(cur)
				initChild(cur)
			}
		}
	}
	for(var i = 0; i < treeJson.length; i++) {
		var cur = treeJson[i]
		// 这里的意思是normalizedId返回的为0或者null
		// 说明这一级是最外层id 把最外层push进ret，
		// 然后对最外层节点cur进行递归
		if(!normalizedId(cur[pidKey])) {
			ret.push(cur)
			initChild(cur)
		}
	}
	return ret
}

// 将id格式化，找出最外层id
function normalizedId(id) {
	var idInt = Number(id)
		// id是非数字类型 直接return
	if(isNaN(idInt)) {
		return id
	} else {
		return idInt
	}
}
