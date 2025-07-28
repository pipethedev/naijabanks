"use client";

import { Check, Copy, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/useToast";
import {
	getAstroCode,
	getSvgSource,
	getVueCode,
	getWebComponentCode,
} from "@/lib/templates";
import { getReactCode } from "@/lib/templates/getReactCode";
import { useModalStore } from "@/store/modalStore";
import type { TLogoCodeFormat, TRawLogo } from "@/types";
import { convertToPascalCase } from "@/utils";
import { copyToClipboard } from "@/utils/clipboard";
import { FORMAT_OPTIONS } from "@/utils/constant";
import { CodeBlock } from "./common/CodeBlock";

type JsxSyntax = "tsx" | "jsx";
type JsxPlatform = "web" | "native";

export function LogoCodeModal() {
	const { logo, closeModal } = useModalStore();
	const [generatedCode, setGeneratedCode] = useState<Record<string, string>>(
		{},
	);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedFormat, setSelectedFormat] = useState<TLogoCodeFormat>("svg");
	const [jsxSyntax, setJsxSyntax] = useState<JsxSyntax>("tsx");
	const [jsxPlatform, setJsxPlatform] = useState<JsxPlatform>("web");
	const [isCopied, setIsCopied] = useState(false);
	const { toast } = useToast();

	const currentCodeKey = useMemo(() => {
		if (selectedFormat !== "jsx") return selectedFormat;

		return `jsx_${jsxPlatform}_${jsxSyntax}` as keyof typeof generatedCode;
	}, [selectedFormat, jsxPlatform, jsxSyntax]);

	const { currentCode, currentLanguage } = useMemo(() => {
		const code = generatedCode[currentCodeKey] || "";
		const language = selectedFormat === "svg" ? "xml" : jsxSyntax;

		return { currentCode: code, currentLanguage: language };
	}, [generatedCode, currentCodeKey, selectedFormat, jsxSyntax]);

	const generateAllCode = useCallback(
		async (targetLogo: TRawLogo) => {
			if (!targetLogo) return;
			setIsLoading(true);
			try {
				const svgText = await getSvgSource({ url: targetLogo.route });
				const componentName = convertToPascalCase(targetLogo.title);

				// all codes are generated at once
				const allSnippets: Record<string, string> = {
					svg: svgText,
					jsx_web_tsx: getReactCode({
						svg: svgText,
						componentName,
						typescript: true,
						native: false,
					}),
					jsx_web_jsx: getReactCode({
						svg: svgText,
						componentName,
						typescript: false,
						native: false,
					}),
					jsx_native_tsx: getReactCode({
						svg: svgText,
						componentName,
						typescript: true,
						native: true,
					}),
					jsx_native_jsx: getReactCode({
						svg: svgText,
						componentName,
						typescript: false,
						native: true,
					}),
					vue: getVueCode({
						lang: "tsx",
						content: svgText,
					}),
					astro: getAstroCode(svgText),
					"web-component": getWebComponentCode({
						title: targetLogo.title,
						svg: svgText,
					}),
				};

				setGeneratedCode(allSnippets);
			} catch (error) {
				console.error("Failed to fetch or generate code:", error);
				toast({ title: "Error loading content", variant: "destructive" });
			} finally {
				setIsLoading(false);
			}
		},
		[toast],
	);

	useEffect(() => {
		if (logo) {
			generateAllCode(logo as TRawLogo);
		}
	}, [logo, generateAllCode]);

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			closeModal();
			setSelectedFormat("svg");
			setGeneratedCode({});
		}
	};

	const handleCopy = useCallback(async () => {
		if (!currentCode) return;
		const success = await copyToClipboard(currentCode);
		if (success) {
			setIsCopied(true);
			toast({ title: "Copied to clipboard!" });
			setTimeout(() => setIsCopied(false), 2000);
		} else {
			toast({ title: "Failed to copy", variant: "destructive" });
		}
	}, [currentCode, toast]);

	return (
		<Sheet open={!!logo} onOpenChange={handleOpenChange}>
			<SheetContent
				className="p-0 sm:max-w-2xl"
				side={isMobile ? "bottom" : "right"}
			>
				{logo && (
					<>
						<SheetHeader className="flex-row items-center justify-between p-6 text-left">
							<div>
								<SheetTitle>{logo.title}</SheetTitle>
								<SheetDescription>
									Select a format and copy the code.
								</SheetDescription>
							</div>
							<SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
								<X className="h-4 w-4" />
								<span className="sr-only">Close</span>
							</SheetClose>
						</SheetHeader>

						<div className="border-border flex flex-wrap items-center justify-between gap-4 border-y px-6 py-4">
							<Select
								value={selectedFormat}
								onValueChange={(v) => setSelectedFormat(v as TLogoCodeFormat)}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select format" />
								</SelectTrigger>
								<SelectContent>
									{FORMAT_OPTIONS.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							{selectedFormat === "jsx" && (
								<div className="flex items-center gap-2">
									<div className="border-border flex items-center rounded-md border p-0.5 text-xs">
										<button
											type="button"
											onClick={() => setJsxPlatform("web")}
											className={`rounded-sm px-2 py-0.5 ${jsxPlatform === "web" ? "bg-secondary" : ""}`}
										>
											Web
										</button>
										<button
											type="button"
											onClick={() => setJsxPlatform("native")}
											className={`rounded-sm px-2 py-0.5 ${jsxPlatform === "native" ? "bg-secondary" : ""}`}
										>
											Native
										</button>
									</div>
									<div className="border-border flex items-center rounded-md border p-0.5 text-xs">
										<button
											type="button"
											onClick={() => setJsxSyntax("tsx")}
											className={`rounded-sm px-2 py-0.5 ${jsxSyntax === "tsx" ? "bg-secondary" : ""}`}
										>
											TSX
										</button>
										<button
											type="button"
											onClick={() => setJsxSyntax("jsx")}
											className={`rounded-sm px-2 py-0.5 ${jsxSyntax === "jsx" ? "bg-secondary" : ""}`}
										>
											JSX
										</button>
									</div>
								</div>
							)}
						</div>

						<div className="relative overflow-hidden p-6">
							{isLoading ? (
								<div className="flex h-[calc(82vh-200px)] items-center justify-center">
									<Spinner size={32} />
								</div>
							) : (
								<div className="relative">
									<CodeBlock
										code={currentCode}
										language={currentLanguage}
										className="h-[calc(82vh-200px)] overflow-auto"
									/>
									<button
										type="button"
										onClick={handleCopy}
										className="bg-secondary hover:bg-accent absolute top-3 right-3 rounded-md p-2"
									>
										{isCopied ? (
											<Check className="h-4 w-4 text-green-500" />
										) : (
											<Copy className="h-4 w-4" />
										)}
									</button>
								</div>
							)}
						</div>
						<div className="border-border text-muted-foreground border-t p-6 text-xs">
							<p>
								Remember to request permission from the creators for the use of
								the SVG. Modification is not allowed.
							</p>
						</div>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
