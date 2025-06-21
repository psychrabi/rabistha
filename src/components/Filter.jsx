import React from "react";

const Filter = React.memo(function Filter({ setFilterType, setSearchTerm, setFilterStatus, filterStatus, filterType, searchTerm }) {
	return (
		<div className="rounded-lg border bg-gray-100 dark:bg-gray-800 text-gray-100 dark:text-gray-900  mb-4">
			<div className="p-3">
				<div className="flex flex-col md:flex-row gap-4 text-gray-900 dark:text-gray-100">
					<div className="flex-1">
						<div className="relative">
							<input placeholder="Search term..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
								className="input flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
							/>
						</div>
					</div>
					<select className="select px-4 py-2 border rounded-lg" value={filterType} onChange={(e) => setFilterType(e.target.value)} >
						<option value="all">All Types</option>
						<option value="Pro-1">Pro-1</option>
						<option value="Pro-2">Pro-2</option>
						<option value="Pro-6">Pro-6</option>
						<option value="Annual-2">Annual-2</option>
						<option value="Annual-3">Annual-3</option>
						<option value="Annual-6">Annual-6</option>
					</select>
					<select className="select px-4 py-2 border rounded-lg" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
						<option value="all">All Status</option>
						<option value="available">Available</option>
						<option value="sold">Sold</option>
						<option value="deactivated">Deactivated</option>
					</select>
				</div>
			</div>
		</div>
	);

});

export default Filter;