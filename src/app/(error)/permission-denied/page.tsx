export default function PermissionDenied() {
	return (
		<section className="mx-auto top-1/2 translate-y-full text-center px-3 md:px-6">
			<h1 className="font-bold text-3xl text-blue-900 mb-10">
				Permission Denied
			</h1>

			<p className="text-xl">
				Sorry, you do not have the permission to access this page.
			</p>
			<p className="text-md text-gray-600 mt-5">
				Have an account?{" "}
				<a className="text-blue-400" href="/login">
					Login
				</a>
			</p>
		</section>
	);
}
