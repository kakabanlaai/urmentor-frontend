import { Label } from '@/components/ui/label.tsx';

const content =
  'Tôi sẽ chia sẻ với với bạn kinh nghiệm làm việc thực tế:\n' +
  ' + Ý nghĩa của công việc, công việc đóng góp như thế nào cho xã hội\n' +
  ' + Công việc thực tế tại công ty\n' +
  ' + Các stakeholder bạn sẽ làm việc cùng (sếp, đồng nghiệp, khách hàng, đối tác, v.v.)\n' +
  ' + Những điều học hỏi được từ công việc, những điều cần cải thiện để làm việc tốt hơn, các yếu tố dẫn đến thành công trong công việc này\n' +
  '\n' +
  'Tôi sẽ chia sẻ với bạn kinh nghiệm ứng tuyển:\n' +
  ' + Các kỳ ứng tuyển trong năm\n' +
  ' + Những điều cần chuẩn bị trước khi ứng tuyển (chuyên môn, kỹ năng mềm, network, tinh thần, thái độ)';

type Program = {
  id: string;
  topic: string;
  title: string;
  description: string;
  price: number;
};
const programs: Program[] = [
  {
    id: '1',
    topic: 'Computer Science',
    title: 'Introduction to Programming',
    description:
      'An introductory course on the fundamentals of programming with an emphasis on problem-solving and algorithm development.',
    price: 30,
  },
  {
    id: '2',
    topic: 'Business',
    title: 'Principles of Management',
    description:
      'A course on the basics of business management, including planning, organizing, leading, and controlling.',
    price: 30,
  },
  {
    id: '3',
    topic: 'Mathematics',
    title: 'Calculus I',
    description:
      'A study of limits, derivatives, integrals, and their applications.',
    price: 0,
  },
  // Add more program entries as needed
];

const ProgramList = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col flex-wrap items-center gap-2 px-3">
        <Label className="text-xl font-bold uppercase text-primary">
          Danh sách chương trình
        </Label>
        <div className="h-1 w-[100px] bg-primary" />
      </div>

      <div className="flex flex-wrap justify-center ">
        {programs.map((program) => (
          <div className="w-full p-2 hover:cursor-pointer md:w-1/2">
            <div className="rounded-lg bg-white shadow-lg hover:shadow-xl">
              <div className="p-4">
                <p className="mt-2 text-sm italic text-gray-600">
                  {program.topic}
                </p>
                <div className={'mt-2 flex'}>
                  <h2 className="flex-1 text-2xl font-bold text-gray-800">
                    {program.title}
                  </h2>
                  {program.price === 0 ? (
                    <span className="text-md font-bold text-green-400">
                      Free
                    </span>
                  ) : (
                    <span className="text-md font-bold text-yellow-400">
                      {program.price} coin
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {program.description.length < 200
                    ? program.description
                    : program.description.substring(0, 200) + '...'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProgramList;
