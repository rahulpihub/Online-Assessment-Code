from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Question  # Assuming you have a Question model
from .serializers import QuestionSerializer


class StaffHomeView(APIView):
    def get(self, request, *args, **kwargs):
        # You can return any data relevant for the staff home page
        data = {
            'message': 'Welcome to the staff home page!',
            'status': 'success'
        }
        return Response(data, status=status.HTTP_200_OK)


class AddQuestionView(APIView):
    def post(self, request, *args, **kwargs):
        # Extract data from the request
        question_data = request.data
        question_text = question_data.get("question")
        options = question_data.get("options")
        correct_option = question_data.get("correctOption")
        mark = question_data.get("mark")
        negative_mark = question_data.get("negativeMark")

        # Assuming you have a Question model with fields for question, options, etc.
        try:
            # Create and save the question
            new_question = Question.objects.create(
                question_text=question_text,
                options=options,
                correct_option=correct_option,
                mark=mark,
                negative_mark=negative_mark
            )

            # Fetch all the questions after saving the new one
            all_questions = Question.objects.all().values()
            
            return Response({"success": "Inputs are submitted!", "questions": list(all_questions)}, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error occurred: {e}")  # Log error to console
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class QuestionListView(APIView):
    def get(self, request):
        # Fetch all questions
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def put(self, request):
        # Update multiple questions or a specific question
        updated_questions = []
        for question_data in request.data:
            try:
                question = Question.objects.get(id=question_data['id'])  # Using id to identify each question
                serializer = QuestionSerializer(question, data=question_data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    updated_questions.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Question.DoesNotExist:
                return Response({"error": f"Question with id {question_data['id']} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(updated_questions, status=status.HTTP_200_OK)




