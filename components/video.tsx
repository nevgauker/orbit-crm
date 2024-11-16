export default function Video({ filePath, type, height, width }: { filePath: string, type: string, height: string, width: string }): React.ReactNode {
    return (
        <video width={width} height={height} controls autoPlay>
            <source src={filePath} type={type} />
        </video>
    );
}