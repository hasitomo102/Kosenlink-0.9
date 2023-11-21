"use client";

import React, { ReactElement, useTransition } from "react";
import { useRouter } from "next/navigation";

type BrandIcons = "google" | "facebook";
type ColorVariants = "white" | "black" | "indigo" | "red";

interface CustomButtonParams {
	isLoading?: boolean;
	title?: string;
	startIcon?: BrandIcons | ReactElement;
	endIcon?: BrandIcons | ReactElement;
	action?: () => Promise<any>;
	referRoute?: string;
	colorVariant?: ColorVariants;
}

export /**
 * Button will submit a form action and show a loading state when it is rendering
 *
 * @return {*}
 */
const ActionButton = ({
	isLoading,
	title,
	startIcon,
	endIcon,
	action,
	referRoute,
	className,
	colorVariant = "white",
	disabled,
	...buttonParams
}: React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> &
	CustomButtonParams) => {
	// get router
	const router = useRouter();

	// define color class params
	const colorClasses: Record<ColorVariants, string> = {
		white: "text-black hover:bg-white focus-visible:outline-grey-300 bg-white ",
		black: "text-white hover:bg-gray-900 focus-visible:outline-grey-300 bg-black ",
		indigo: "text-white hover:bg-indigo-500 focus-visible:outline-grey-300 bg-indigo-600 ",
		red: "text-white hover:bg-red-500 focus-visible:outline-grey-300 bg-red-600 ",
	};

	// set icons
	const icons: Record<BrandIcons, React.ReactElement> = {
		facebook: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="mr-2 h-6 w-6"
				width="800px"
				height="800px"
				viewBox="-0.5 0 48 48"
			>
				<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
			</svg>
		),
		google: (
			<svg
				className="mr-2 h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="800px"
				height="800px"
				viewBox="-0.5 0 48 48"
				version="1.1"
			>
				{" "}
				<title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
				<defs> </defs>{" "}
				<g
					id="Icons"
					stroke="none"
					stroke-width="1"
					fill="none"
					fill-rule="evenodd"
				>
					{" "}
					<g
						id="Color-"
						transform="translate(-401.000000, -860.000000)"
					>
						{" "}
						<g
							id="Google"
							transform="translate(401.000000, 860.000000)"
						>
							{" "}
							<path
								d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
								id="Fill-1"
								fill="#FBBC05"
							>
								{" "}
							</path>{" "}
							<path
								d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
								id="Fill-2"
								fill="#EB4335"
							>
								{" "}
							</path>{" "}
							<path
								d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
								id="Fill-3"
								fill="#34A853"
							>
								{" "}
							</path>{" "}
							<path
								d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
								id="Fill-4"
								fill="#4285F4"
							>
								{" "}
							</path>{" "}
						</g>{" "}
					</g>{" "}
				</g>{" "}
			</svg>
		),
	};

	// get transition state
	const [isPending, startTransition] = useTransition();

	// handle click with button
	const handleClick = async () => {
		// invoke another call for the user data to update
		if (action) {
			startTransition(async () => {
				try {
					// call form action
					await action();
					// route to new page
					if (referRoute) router.push(referRoute);
				} catch (e: any) {
					throw Error(e);
				}
			});
		} else if (!action && referRoute) router.push(referRoute);
	};

	return (
		<button
			disabled={isPending || isLoading || disabled}
			onClick={() => handleClick()}
			className={"inline-flex items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold  shadow-md hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
				.concat(colorClasses[colorVariant])
				.concat(className || "")}
			{...buttonParams}
		>
			{typeof startIcon === "string" && !isPending && !isLoading
				? icons[startIcon]
				: null}
			{startIcon &&
			typeof startIcon !== "string" &&
			!isPending &&
			!isLoading
				? startIcon
				: null}
			{isPending || isLoading ? (
				<svg
					aria-hidden="true"
					role="status"
					className={"mr-3 inline h-4 w-4 animate-spin text-gray-500"}
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="#E5E7EB"
					></path>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentColor"
					></path>
				</svg>
			) : null}
			<p
				className={
					colorVariant === "white" ? "text-black" : "text-white"
				}
			>
				{isPending || isLoading ? "Loading..." : title || "Submit"}
			</p>
			{typeof endIcon === "string" && !isPending && !isLoading
				? icons[endIcon]
				: null}
			{endIcon && typeof endIcon !== "string" && !isPending && !isLoading
				? endIcon
				: null}
		</button>
	);
};
