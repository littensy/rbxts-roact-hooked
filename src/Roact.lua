if script:FindFirstAncestor("node_modules") then
	return require(script:FindFirstAncestor("node_modules").roact.src)
elseif script.Parent.Parent:FindFirstChild("Roact") then
	return require(script.Parent.Parent.Roact)
else
	error("Could not find Roact or @rbxts/roact in the parent hierarchy.")
end
