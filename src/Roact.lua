if script.Parent.Parent:FindFirstChild("Roact") then
	return require(script.Parent.Parent.Roact)
elseif script:FindFirstAncestor("node_modules") then
	return require(script:FindFirstAncestor("node_modules").roact.src)
else
	error("Could not find Roact or roact in the parent hierarchy.")
end
